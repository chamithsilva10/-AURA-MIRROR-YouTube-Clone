import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard, Loader } from "./";
import { axiosGetReq } from "../utils";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await axiosGetReq(`channels?part=snippet&id=${id}`);
        setChannelDetail(data?.items?.[0] || null);

        const videosData = await axiosGetReq(
          `search?channelId=${id}&part=snippet,id&order=date`
        );
        setVideos(videosData?.items || []);
      } catch (error) {
        console.error("Error fetching channel details:", error);
      }
    };

    if (id) fetchResults();
  }, [id]); 

  if (!videos) return <Loader />; 

  return (
    <Box minHeight="95vh">
      <Box>
        {channelDetail?.brandingSettings?.image?.bannerExternalUrl && (
          <img
            src={channelDetail?.brandingSettings?.image?.bannerExternalUrl}
            alt="channel-art"
            style={{
              height: "300px",
              width: "100%",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        )}
        <ChannelCard channelDetail={channelDetail} mt="-93px" />
      </Box>
      <Box p={2}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
