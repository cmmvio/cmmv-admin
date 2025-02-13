require('dotenv').config()

module.exports = {
    env: process.env.NODE_ENV,

    app: {
        telemetry: false,
        sourceDir: 'api',
    },

    server: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 3000,
        poweredBy: false,
        removePolicyHeaders: false,
        publicDirs: ['public', 'public/views'],
        render: '@cmmv/view',
        compress: {
            enabled: true,
            options: {
                level: 6,
            },
        },
        cors: true,
        logging: 'all',
        helmet: {
            enabled: false,
            options: {
                contentSecurityPolicy: false,
            },
        },
        session: {
            enabled: true,
            options: {
                sessionCookieName: process.env.SESSION_COOKIENAME || 'cmmv-session',
                secret: process.env.SESSION_SECRET || 'secret',
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: true,
                    maxAge: 60000,
                },
            },
        },
    },

    rpc: {
        enabled: false,
    },

    repository: {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'cmmv',
        synchronize: true,
        logging: false,
    },

    cache: {
        store: '@tirke/node-cache-manager-ioredis',
        getter: 'ioRedisStore',
        host: 'localhost',
        port: 6379,
        ttl: 600,
    },

    auth: {
        localRegister: true,
        localLogin: true,
        jwtSecret: process.env.JWT_SECRET || 'secret',
        jwtSecretRefresh: process.env.JWT_SECRET_REFRESH || 'secret',
        expiresIn: 60 * 60 * 24,
        recaptcha: {
            required: true,
            secret: process.env.RECAPTCHA_SECRET,
        },
    },
}
