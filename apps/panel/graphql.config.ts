import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CodegenConfig } from "@graphql-codegen/cli";
import type { ClientPresetConfig } from "@graphql-codegen/client-preset";
import type { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import type { TypeScriptDocumentsPluginConfig } from "@graphql-codegen/typescript-operations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config: CodegenConfig = {
  overwrite: true,
  schema: path.join(dirname, "*.graphqls"),
  documents: path.join(dirname, "./src/**/*.{ts,tsx}"),
  generates: {
    "./src/gql/__generated__/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
        gqlTagName: "gql",
      } satisfies ClientPresetConfig,
      config: {
        strictScalars: true,
        useTypeImports: true,
        skipTypename: true,
        arrayInputCoercion: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        enumsAsTypes: true,
      } satisfies TypeScriptPluginConfig & TypeScriptDocumentsPluginConfig,
    },
  },
};

export default config;
