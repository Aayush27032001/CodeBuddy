import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataGrid from "../Components/common/DataDrid";
const CreateTest = () => {
  const QuestionForm = () => {
    const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTestCase = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    const handleSaveTestCases = (newTestCases) => {
      setTestCases(newTestCases);
      setIsModalOpen(false);
    };

    return (
      <Box m={2}>
        <Typography variant="h5" gutterBottom>
          Question Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Description" multiline />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Constraints
            </Typography>
            <TextField fullWidth label="Constraints" multiline />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddTestCase}
              >
                Add Test Cases
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle>Add Test Cases</DialogTitle>
          <DialogContent sx={{ overflowX: "hidden" }}>
            <Box width={600}>
              <DataGrid testCases={testCases} onSave={handleSaveTestCases} />
            </Box>
            <DialogActions>
              <Button onClick={handleModalClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
    );
  };
  return (
    <div>
      <QuestionForm />
    </div>
  );
};

export default CreateTest;
