import { CustomError } from "../func/error";
import { DomainApi } from "../func/router/domainApi";
import { generateKey } from "../func/utils/generateKey";
import { generateShortname } from "../func/utils/generateShortname";
import { Player } from "../model/playerModel";
import { Team } from "../model/teamModel";

export const teamRoutes: Array<DomainApi> = [
  {
    url: "/get/all",
    method: "get",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const teams = await Team.find({ status: true }).select("key name src");
      res.json({ success: true, payload: teams });
    },
  },
  {
    url: "/get/:teamKey",
    method: "get",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { teamKey } = req.params;
      const team = await Team.findOne({ key: teamKey });
      if (!team) throw new CustomError("BadRequestError", ["Team not found"]);
      res.json({ success: true, payload: team });
    },
  },
  {
    url: "/get/stats/:teamKey",
    method: "get",
    middlewares: [],
    controllerFunc: (req, res) => {
      throw new CustomError("NotFoundError", ["api route not found"]);
    },
  },
  {
    url: "/add",
    method: "post",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { name, src } = req.body.payload;
      const team = Team.build({
        name,
        key: generateKey(),
        shortName: generateShortname(name),
        src,
      });
      await team.save();
      res.json({
        success: true,
        payload: {
          id: team.id,
          key: team.key,
          name: team.name,
          src: team.src,
        },
      });
    },
  },
  {
    url: "/update/:teamKey",
    method: "put",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { teamKey } = req.params;
      const { src } = req.body.payload;
      const team = await Team.findOne({ key: teamKey });
      if (!team) throw new CustomError("BadRequestError", ["Team not found"]);
      team.src = src;
      await team.save();
      res.json({
        success: true,
        payload: {
          id: team.id,
          key: team.key,
          name: team.name,
          src: team.src,
        },
      });
    },
  },
  {
    url: "/delete/:teamKey",
    method: "delete",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { teamKey } = req.params;
      const team = await Team.findOne({ key: teamKey });
      if (!team) throw new CustomError("BadRequestError", ["Team not found"]);
      team.status = false;
      await team.save();
      res.json({ success: true, payload: teamKey });
    },
  },
];
