import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import events from "./events";
import moment from "moment";
import Box from "@mui/material/Box";

const localizer = momentLocalizer(moment);

function EventWeek({ event }) {
  return (
    <div>
      <strong style={{ color: "#27E2A5" }}>{event.title}</strong>
      <p>Capacity: {event.capacity}</p>
    </div>
  );
}

function EventStyle(event, start, end, isSelected) {
  return {
    style: {
      backgroundColor: "#00249C",
      borderColor: "#001e80",
    },
  };
}

const TimeSlotsCalendar = (props) => {
  const [slots, setSlots] = useState(events);
  const [slotDialogOpen, setSlotDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [capacity, setCapacity] = useState(10);
  const [editSlot, setEditSlot] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = ({ start, end }) => {
    console.log(start, end);
    setStart(start);
    setEnd(end);
    handleClickOpen();
  };

  const saveSlot = () => {
    const newSlot = {
      title: "Time Slot",
      start,
      end,
      capacity: "100 packages",
    };
    setSlots([...slots, newSlot]);
    handleClose();
  };

  const handleOpenEditSlot = (event) => {
    setSlotDialogOpen(true);
    setEditSlot(event);
  };

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={slots}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={["week"]}
        eventPropGetter={EventStyle}
        onSelectEvent={handleOpenEditSlot}
        components={{
          week: {
            event: EventWeek,
          },
        }}
        onSelectSlot={handleSelect}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Time Slot</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box m={2}>
                  <DateTimePicker
                    autoFocus
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Time"
                    value={start}
                    onChange={setStart}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box m={2}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Time"
                    value={end}
                    onChange={setEnd}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box m={2}>
              <TextField
                id="capacity"
                label="Capacity"
                type="number"
                value={capacity}
                onChange={(e) => {
                  setCapacity(e.value);
                }}
                fullWidth
              />
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveSlot}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={slotDialogOpen} onClose={() => setSlotDialogOpen(false)}>
        <DialogTitle>Edit Slot</DialogTitle>
        <DialogContent>
          {editSlot.id} - {editSlot.title}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSlotDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => setSlotDialogOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TimeSlotsCalendar;
