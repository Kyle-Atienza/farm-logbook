import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { specs } from './swagger';
import harvestsRouter from './routes/harvests';
import employeesRouter from './routes/employees';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/harvests', harvestsRouter);
app.use('/employees', employeesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
});
