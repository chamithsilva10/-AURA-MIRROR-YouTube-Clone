import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Videos, Categories } from "./";
import { axiosGetReq } from "../utils";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);
    const fetchVideos = async () => {
      const data = await axiosGetReq(
        `search?part=snippet&q=${selectedCategory}`
      );
      setVideos(data.items);
    };

    fetchVideos();
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          position: "relative",
          justifyContent: "space-between",
          alignItems: "center",
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <p
          className="copyright"
          style={{
            color: "#fff",
            fontSize: "15px",
            backgroundColor: "black",
            textAlign: "center",
          }}
        >
          Copyright © 2025 AURA MIRROR
        </p>
      </Box>

      <Box
        p={2}
        sx={{
          overflowY: "auto",
          height: "88vh",
          flex: 2,
        }}
      >
        <Typography
          fontSize={25}
          fontWeight={900}
          textAlign="left"
          mb={2}
          sx={{ textTransform: "capitalize", color: "white" }}
        >
          {selectedCategory || "Recommended"}{" "}
          <span style={{ color: "#FC1503" }}>Videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
