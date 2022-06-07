import { Grid } from "@mui/material";
import React from "react";
import PlayerList from "../components/Home/PlayerList";
import TeamList from "../components/Home/TeamList";

export default function HomePage() {
  return (
    <>
      <Grid spacing={1} sx={{ p: 1 }} container>
        <Grid item xs={12} md={6}>
          <PlayerList />
        </Grid>
        <Grid item xs={12} md={6}>
          <TeamList />
        </Grid>
      </Grid>

      <Grid item container xs={12} md={12}></Grid>
    </>
  );
}
