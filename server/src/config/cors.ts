const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
