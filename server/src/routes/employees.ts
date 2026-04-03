import { Router, Request, Response } from 'express';
import {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByTgId,
    createEmployee,
    updateEmployeeById,
    deleteEmployeeById
} from '../services/employees';

const router = Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/', async (req: Request, res: Response) => {
    const data = await getAllEmployees();
    res.json(data);
});

/**
 * @swagger
 * /employees/tg/{tgId}:
 *   get:
 *     summary: Get an employee by Telegram ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: tgId
 *         schema:
 *           type: string
 *         required: true
 *         description: Telegram ID
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// lookup by Telegram ID (tgId)
router.get('/tg/:tgId', async (req: Request, res: Response) => {
    const e = await getEmployeeByTgId(req.params.tgId);
    if (!e) return res.status(404).json({ error: 'Employee not found' });
    res.json(e);
});

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', async (req: Request, res: Response) => {
    const e = await getEmployeeById(req.params.id);
    if (!e) return res.status(404).json({ error: 'Employee not found' });
    res.json(e);
});

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeCreate'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.post('/', async (req: Request, res: Response) => {
    const created = await createEmployee(req.body || {});
    res.status(201).json(created);
});

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeUpdate'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', async (req: Request, res: Response) => {
    const updated = await updateEmployeeById(req.params.id, req.body || {});
    if (!updated) return res.status(404).json({ error: 'Employee not found' });
    res.json(updated);
});

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const ok = await deleteEmployeeById(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Employee not found' });
    res.status(204).end();
});

export default router;
