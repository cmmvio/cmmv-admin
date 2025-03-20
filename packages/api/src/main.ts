import { Application } from '@cmmv/core'
import { DefaultAdapter, DefaultHTTPModule } from '@cmmv/http'
import { RepositoryModule, Repository } from '@cmmv/repository'
import { AuthModule } from '@cmmv/auth'
import { GraphQLModule } from "@cmmv/graphql";
import { SandboxModule, SandboxService } from '@cmmv/sandbox'

Application.create({
    httpAdapter: DefaultAdapter,
    modules: [
        DefaultHTTPModule,
        RepositoryModule,
        AuthModule,
        GraphQLModule,
        SandboxModule
    ],
    providers: [
        Repository,
        SandboxService
    ],
})
