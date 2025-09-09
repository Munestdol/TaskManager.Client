import { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  getTasks,
  updateTaskStatus,
  createTask,
  updateTask,
  deleteTask
} from '../api/tasks';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const statuses = [
  { key: 'Todo', label: 'To Do', color: 'default' },
  { key: 'InProgress', label: 'In Progress', color: 'warning' },
  { key: 'Done', label: 'Done', color: 'success' }
];

const statusMap = {
  0: 'Todo',
  1: 'InProgress',
  2: 'Done'
};

const reverseStatusMap = {
  'Todo': 0,
  'InProgress': 1,
  'Done': 2
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 0,
    dueDateUtc: ''
  });

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleMenuOpen = (event, task) => {
    setMenuAnchor(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    if (!selectedTask) return;
    setNewTask({
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
      dueDateUtc: selectedTask.dueDateUtc?.split('T')[0] || ''
    });
    setIsEditMode(true);
    setOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    if (window.confirm(`Удалить задачу "${selectedTask.title}"?`)) {
      await deleteTask(selectedTask.id);
      const updated = await getTasks();
      setTasks(updated.data);
    }
    handleMenuClose();
  };

  useEffect(() => {
    getTasks().then(res => setTasks(res.data));
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    setTasks(prev =>
      prev.map(task =>
        task.id === draggableId
          ? { ...task, status: reverseStatusMap[destination.droppableId] }
          : task
      )
    );

    try {
      await updateTaskStatus(draggableId, reverseStatusMap[destination.droppableId]);
    } catch (err) {
      console.error('Ошибка обновления статуса', err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setSelectedTask(null);
          setIsEditMode(false);
          setNewTask({ title: '', description: '', status: 0, dueDateUtc: '' });
          setOpen(true);
        }}
      >
        + Add Task
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          {isEditMode ? 'Edit Task' : 'Create Task'}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pt: 2
          }}
        >
          <TextField
            label="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newTask.dueDateUtc}
            onChange={(e) => setNewTask({ ...newTask, dueDateUtc: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              if (isEditMode && selectedTask) {
                await updateTask(selectedTask.id, {
                  ...newTask,
                  dueDateUtc: new Date(newTask.dueDateUtc).toISOString()
                });
              } else if (!isEditMode) {
                await createTask({
                  ...newTask,
                  dueDateUtc: new Date(newTask.dueDateUtc).toISOString()
                });
              }
              const updated = await getTasks();
              setTasks(updated.data);
              setOpen(false);
              setNewTask({ title: '', description: '', status: 0, dueDateUtc: '' });
              setIsEditMode(false);
              setSelectedTask(null);
            }}
          >
            {isEditMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          container
          spacing={2}
          sx={{
            width: '100%',
            margin: 0,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {statuses.map(status => (
            <Grid
              item
              key={status.key}
              xs={12}
              md
              sx={{
                flex: 1,
                minWidth: 0
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  minHeight: '80vh',
                  backgroundColor: '#f8fafc'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {status.label}
                </Typography>
                <Droppable droppableId={status.key}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ minHeight: '70vh' }}
                    >
                      {tasks
                        .filter(t => statusMap[t.status] === status.key)
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <Paper
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                elevation={1}
                                sx={{
                                  p: 1.5,
                                  mb: 1.5,
                                  backgroundColor: 'white',
                                  position: 'relative'
                                }}
                              >
                                <IconButton
                                  size="small"
                                  sx={{ position: 'absolute', top: 4, right: 4 }}
                                  onClick={(e) => handleMenuOpen(e, task)}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>

                                <Typography variant="subtitle1" fontWeight="bold">
                                  {task.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {task.description}
                                </Typography>
                                <Chip
                                  label={status.label}
                                  color={status.color}
                                  size="small"
                                  sx={{ mt: 1 }}
                                />
                              </Paper>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </Box>
  );
}
