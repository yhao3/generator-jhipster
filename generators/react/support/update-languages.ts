/**
 * Copyright 2013-2025 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type BaseGenerator from '../../base-core/index.js';
import { type UpdateClientLanguagesTaskParam, updateLanguagesInDayjsConfigurationTask } from '../../client/support/index.js';
import { generateLanguagesWebappOptions } from '../../languages/support/index.js';

function updateLanguagesInPipeTask(this: BaseGenerator, { application }: UpdateClientLanguagesTaskParam) {
  const { clientSrcDir, languagesDefinition = [] } = application;
  const { ignoreNeedlesError: ignoreNonExisting } = this;
  const newContent = `{
        ${generateLanguagesWebappOptions(languagesDefinition).join(',\n        ')}
        // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
    };
`;
  this.editFile(`${clientSrcDir}/app/config/translation.ts`, { ignoreNonExisting }, content =>
    content.replace(/{\s*('[a-z-]*':)?([^=]*jhipster-needle-i18n-language-key-pipe[^;]*)\};/g, newContent),
  );
}

function updateLanguagesInWebpackReactTask(this: BaseGenerator, { application }: UpdateClientLanguagesTaskParam) {
  const { clientRootDir, clientSrcDir, languages } = application;
  const { ignoreNeedlesError: ignoreNonExisting } = this;
  let newContent = 'groupBy: [\n';
  // prettier-ignore
  languages?.forEach((language) => {
      newContent += `                    { pattern: "./${this.relativeDir(clientRootDir, clientSrcDir)}i18n/${language}/*.json", fileName: "./i18n/${language}.json" },\n`;
          });
  newContent +=
    '                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array\n' +
    '                ]';

  this.editFile(`${application.clientRootDir}webpack/webpack.common.js`, { ignoreNonExisting }, content =>
    content.replace(/groupBy:.*\[([^\]]*jhipster-needle-i18n-language-webpack[^\]]*)\]/g, newContent),
  );
}

export default function updateLanguagesTask(this: BaseGenerator, taskParam: UpdateClientLanguagesTaskParam) {
  updateLanguagesInPipeTask.call(this, taskParam);
  updateLanguagesInWebpackReactTask.call(this, taskParam);
  updateLanguagesInDayjsConfigurationTask.call(this, taskParam, {
    configurationFile: `${taskParam.application.clientSrcDir}app/config/dayjs.ts`,
    commonjs: true,
  });
}
