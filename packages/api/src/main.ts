import { Application } from '@cmmv/core'
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http'
import { RepositoryModule, Repository } from '@cmmv/repository'
import { AuthModule } from '@cmmv/auth'

Application.create({
    httpAdapter: DefaultAdapter,
    modules: [
        DefaultHTTPModule,
        RepositoryModule,
        AuthModule
    ],
    services: [Repository],
})
