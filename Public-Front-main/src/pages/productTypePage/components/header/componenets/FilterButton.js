import React, { useState } from "react";
import { Modal, Box, Button, Grid, Typography, Divider } from "@mui/material";
import { LuSettings2 } from "react-icons/lu";

const FilterModal = ({
  uniqueClassifications,
  uniqueSizes,
  setActiveColorFilters,
  setActiveSizeFilters,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempColorFilters, setTempColorFilters] = useState([]);
  const [tempSizeFilters, setTempSizeFilters] = useState([]);

  const toggleFilterModal = () => setShowFilterModal(!showFilterModal);

  const toggleTempColorFilter = (color) => {
    setTempColorFilters((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleTempSizeFilter = (size) => {
    setTempSizeFilters((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const applyFilters = () => {
    setActiveColorFilters(tempColorFilters);
    setActiveSizeFilters(tempSizeFilters);
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setTempColorFilters([]);
    setTempSizeFilters([]);
  };

  return (
    <>
      <Button
        onClick={toggleFilterModal}
        sx={{
          color: "grey",
          border: "none",
          background: "none",
          gap: "10px",
          paddingRight: "20px",
          padding: "20px",
        }}
      >
        Filter <LuSettings2 size={17} />
      </Button>

      <Modal open={showFilterModal} onClose={toggleFilterModal}>
        <Box
          sx={{
            width: "30%",
            height: "100%",
            position: "fixed",
            top: 0,
            right: 0,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "-15px",
              marginBottom: "-15px",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "20px" }}>
              Filter
            </Typography>
            <Button
              onClick={toggleFilterModal}
              sx={{
                fontSize: "20px",
                color: "grey",
              }}
            >
              X
            </Button>
          </div>

          <Divider
            sx={{
              marginY: "25px",
              borderColor: "#808080",
              width: "calc(100% + 60px)",
              ml: "-30px",
              mr: "-30px",
            }}
          />

          <div style={{ padding: "20px" }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: "20px", fontSize: "15px" }}
            >
              Colour
            </Typography>
            <Grid container spacing={1}>
              {uniqueClassifications.map(([name, color], idx) => (
                <Grid item key={idx}>
                  <Box
                    onClick={() => toggleTempColorFilter(color)}
                    sx={{
                      backgroundColor: color,
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      marginLeft: "30px",
                      boxShadow: tempColorFilters.includes(color)
                        ? "0 0 0 2px #ffffff, 0 0 0 3px #000000"
                        : "0 0 0 2px #ffffff, 0 0 0 3px #EAEAEC",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                    title={name}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          <Divider
            sx={{
              marginY: "25px",
              borderColor: "#808080",
              width: "calc(100% + 60px)",
              ml: "-30px",
              mr: "-30px",
            }}
          />

          <div style={{ padding: "20px" }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: "10px", fontSize: "15px" }}
            >
              Size
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {uniqueSizes.map((size, idx) => (
                <Button
                  key={idx}
                  variant={
                    tempSizeFilters.includes(size) ? "contained" : "outlined"
                  }
                  onClick={() => toggleTempSizeFilter(size)}
                  sx={{
                    marginBottom: "5px",
                    border: "none",
                    textAlign: "left",
                    width: "25%",
                    color: "grey",
                  }}
                >
                  ({size})
                </Button>
              ))}
            </Box>
          </div>

          <Box
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              position: "fixed",
              bottom: 0,
              width: "25%",
            }}
          >
            <Divider
              sx={{
                marginY: "25px",
                borderColor: "#808080",
                width: "calc(100% + 60px)",
                ml: "-30px",
                mr: "-30px",
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={applyFilters}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#3E3E3E",
                borderRadius: "0px",
              }}
            >
              See Results
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={resetFilters}
              sx={{
                borderColor: "#808080",
                color: "#808080",
                borderRadius: "0px",
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FilterModal;
