import * as mongoose from "mongoose";
// TODO domination video
interface ThemeAttrs {
  name: string;
  src: string;
  teamsTop4: {
    src: string;
  };
  teamsEliminationVideo: {
    src: string;
    animation: { startAfterSecs: number; endAfterSecs: number; style: string };
    teamFinishesText: {
      color: string;
      size: number;
      position: { x: number; y: number };
    };
    teamNameText: {
      color: string;
      size: number;
      position: { x: number; y: number };
    };
    teamSrcImage: { size: number; position: { x: number; y: number } };
  };
  teamsPredictionTable: {
    teamNameText: { color: string };
    teamPredictionText: { color: string };
  };
  teamsStatusTable: {
    teamNameText: { color: string };
    playerAlive: { color: string };
    playerDead: { color: string };
  };
}

export interface ThemeDoc extends mongoose.Document {
  name: string;
  src: string;
  status: boolean;
  teamsTop4: {
    src: string;
  };
  teamsEliminationVideo: {
    src: string;
    animation: { startAfterSecs: number; endAfterSecs: number; style: string };
    teamFinishesText: {
      color: string;
      size: number;
      position: { x: number; y: number };
    };
    teamNameText: {
      color: string;
      size: number;
      position: { x: number; y: number };
    };
    teamSrcImage: { size: number; position: { x: number; y: number } };
  };
  teamsPredictionTable: {
    teamNameText: { color: string };
    teamPredictionText: { color: string };
  };
  teamsStatusTable: {
    teamNameText: { color: string };
    playerAlive: { color: string };
    playerDead: { color: string };
  };
}

interface ThemeModel extends mongoose.Model<ThemeDoc> {
  build(attrs: ThemeAttrs): ThemeDoc;
}

const ThemeSchema = new mongoose.Schema(
  {
    name: String,
    src: String,
    status: { type: Boolean, default: true },
    teamsTop4: {
      src: String,
    },
    teamsEliminationVideo: {
      src: String,
      animation: {
        startAfterSecs: Number,
        endAfterSecs: Number,
        style: String,
      },
      teamFinishesText: {
        color: String,
        size: Number,
        position: { x: Number, y: Number },
      },
      teamNameText: {
        color: String,
        size: Number,
        position: { x: Number, y: Number },
      },
      teamSrcImage: { size: Number, position: { x: Number, y: Number } },
      teamsPredictionTable: {
        teamNameText: { color: String },
        teamPredictionText: { color: String },
      },
    },
    teamsStatusTable: {
      teamNameText: { color: String },
      playerAlive: { color: String },
      playerDead: { color: String },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

ThemeSchema.statics.build = (attrs: ThemeAttrs) => new Theme(attrs);

export const Theme = mongoose.model<ThemeDoc, ThemeModel>(
  "themes",
  ThemeSchema
);
