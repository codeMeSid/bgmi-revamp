import { PlayArrow, Stop, HelpOutline } from "@mui/icons-material";

export default function MatchPage() {
  const getTitleByStatus = (value: any) => {
    switch (value) {
      case "started":
        return "Stop Match";
      case "upcoming":
        return "Start Match";
      case "stopped":
        return "Start Match";
      default:
        return "Mystery";
    }
  };
  const getIconByStatus = (value: any) => {
    switch (value) {
      case "upcoming":
        return <PlayArrow fontSize="small" />;
      case "started":
        return <Stop fontSize="small" />;
      case "stopped":
        return <PlayArrow fontSize="small" />;
      default:
        return <HelpOutline fontSize="small" />;
    }
  };
  return <></>;
}
