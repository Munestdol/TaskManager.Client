import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Chip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getTasks, updateTaskStatus } from '../api/tasks';

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {statuses.map(status => (
            <Grid size={{ xs: 12, md: 4 }} key={status.key}>
              <Paper elevation={3} sx={{ p: 2, minHeight: '80vh', backgroundColor: '#f8fafc' }}>
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
                                sx={{ p: 2, mb: 2, backgroundColor: 'white' }}
                              >
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
    </Box>
  );
}
