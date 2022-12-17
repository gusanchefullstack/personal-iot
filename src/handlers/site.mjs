import { body } from "express-validator";
import { prisma } from "../db.mjs";

export const getSites = async (req, res, next) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: req.user.id,
      },
      include: {
        sites: true,
      },
    });
    res.json({ data: user.sites });
  } catch (error) {
    next(e);
  }
};

export const getOneSite = async (req, res, next) => {
  try {
    const site = await prisma.site.findFirst({
      where: {
        AND: [
          {
            id: {
              equals: req.params.id,
            },
          },
          {
            userId: req.user.id,
          },
        ],
      },
    });
    res.json({ data: site });
  } catch (error) {
    next(e);
  }
};

export const createSite = async (req, res, next) => {
  try {
    const createdSite = await prisma.site.create({
      data: {
        name: req.body.name,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address,
        userId: req.user.id,
      },
    });
    res.json({ data: createdSite });
  } catch (error) {
    next(e);
  }
};

export const updateSite = async (req, res, next) => {
  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address,
      },
    });
    res.json({ data: updatedSite });
  } catch (error) {
    next(error);
  }
};

export const deleteSite = async (req, res, next) => {
  try {
    const deletedSite = await prisma.site.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: deletedSite });
  } catch (error) {
    next(error);
  }
};
