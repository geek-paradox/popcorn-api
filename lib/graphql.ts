import {GraphQLModule} from "@graphql-modules/core";
import {MovieModule} from "./Movie";

export const appModule = new GraphQLModule({
   imports: [
       MovieModule,
   ],
});
