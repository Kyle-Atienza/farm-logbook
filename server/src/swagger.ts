import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Farm Logbook API',
            version: '0.1.0',
            description: 'API for managing farm harvests and employees',
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Harvest: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            description: 'Unique identifier',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Creation timestamp',
                        },
                        quantity: {
                            type: 'number',
                            nullable: true,
                            description: 'Harvest quantity',
                        },
                        loggedBy: {
                            type: 'number',
                            description: 'Employee ID who logged the harvest',
                        },
                    },
                    required: ['id', 'createdAt', 'loggedBy'],
                },
                HarvestCreate: {
                    type: 'object',
                    properties: {
                        quantity: {
                            type: 'number',
                            nullable: true,
                            description: 'Harvest quantity',
                        },
                        loggedBy: {
                            type: 'number',
                            description: 'Employee ID who logged the harvest',
                        },
                    },
                    required: ['loggedBy'],
                },
                HarvestUpdate: {
                    type: 'object',
                    properties: {
                        quantity: {
                            type: 'number',
                            nullable: true,
                            description: 'Harvest quantity',
                        },
                        loggedBy: {
                            type: 'number',
                            description: 'Employee ID who logged the harvest',
                        },
                    },
                },
                Employee: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            description: 'Unique identifier',
                        },
                        tgId: {
                            type: 'string',
                            nullable: true,
                            description: 'Telegram ID',
                        },
                        name: {
                            type: 'string',
                            description: 'Employee name',
                        },
                    },
                    required: ['id', 'name'],
                },
                EmployeeCreate: {
                    type: 'object',
                    properties: {
                        tgId: {
                            type: 'string',
                            nullable: true,
                            description: 'Telegram ID',
                        },
                        name: {
                            type: 'string',
                            description: 'Employee name',
                        },
                    },
                    required: ['name'],
                },
                EmployeeUpdate: {
                    type: 'object',
                    properties: {
                        tgId: {
                            type: 'string',
                            nullable: true,
                            description: 'Telegram ID',
                        },
                        name: {
                            type: 'string',
                            description: 'Employee name',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);
