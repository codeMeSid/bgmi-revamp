import { CustomError } from "../func/error";
import { DomainApi } from "../func/router/domainApi";
import { generateKey } from "../func/utils/generateKey";
import { generateShortname } from "../func/utils/generateShortname";
import { Player } from "../model/playerModel";

export const playerRoutes: Array<DomainApi> = [
  {
    url: "/get/all",
    method: "get",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const players = await Player.find({ status: true }).select(
        "key name src"
      );
      res.json({ success: true, payload: players });
    },
  },
  {
    url: "/get/:playerKey",
    method: "get",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { playerKey } = req.params;
      const player = await Player.findOne({ key: playerKey });
      if (!player)
        throw new CustomError("BadRequestError", ["Player not found"]);
      res.json({ success: true, payload: player });
    },
  },
  {
    url: "/get/stats/:playerKey",
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
      const player = Player.build({
        name,
        key: generateKey(),
        shortName: generateShortname(name),
        src,
      });
      await player.save();
      res.json({
        success: true,
        payload: {
          id: player.id,
          key: player.key,
          name: player.name,
          src: player.src,
        },
      });
    },
  },
  {
    url: "/update/:playerKey",
    method: "put",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { playerKey } = req.params;
      const { src } = req.body.payload;
      const player = await Player.findOne({ key: playerKey });
      if (!player)
        throw new CustomError("BadRequestError", ["Player not found"]);
      player.src = src;
      await player.save();
      res.json({
        success: true,
        payload: {
          id: player.id,
          key: player.key,
          name: player.name,
          src: player.src,
        },
      });
    },
  },
  {
    url: "/delete/:playerKey",
    method: "delete",
    middlewares: [],
    controllerFunc: async (req, res) => {
      const { playerKey } = req.params;
      const player = await Player.findOne({ key: playerKey });
      if (!player)
        throw new CustomError("BadRequestError", ["Player not found"]);
      player.status = false;
      await player.save();
      res.json({ success: true, payload: playerKey });
    },
  },
];
