/**
 * Copyright 2013-2022 the original author or authors from the JHipster project.
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
import { jestExpect as expect } from 'mocha-expect-snapshot';
import lodash from 'lodash';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

import Generator from './index.mjs';
import { dryRunHelpers as helpers } from '../../test/support/helpers.mjs';
import { fieldTypes } from '../../jdl/jhipster/index.mjs';

const {
  CommonDBTypes: { UUID },
} = fieldTypes;

const { snakeCase } = lodash;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatorPath = join(__dirname, 'index.mts');
const generator = basename(__dirname);

const expectedField = field => ({
  generateFakeData: expect.any(Function),
  createRandexp: expect.any(Function),

  entity: expect.any(Object),
  reference: expect.any(Object),
});

const expectedRelationship = relationship => ({
  otherEntity: expect.any(Object),
});

const expectedPrimaryKeyId = id => ({
  field: expect.any(Object),
});

const expectedPrimaryKey = primaryKey => ({
  ownFields: expect.any(Array),
  fields: expect.any(Array),
  derivedFields: expect.any(Array),
  ids: primaryKey.ids.map(expectedPrimaryKeyId),
});

const expectedEntity = entity => ({
  faker: expect.any(Object),
  generateFakeData: expect.any(Function),
  resetFakerSeed: expect.any(Function),

  allReferences: expect.any(Array),
  blobFields: expect.any(Array),
  otherEntities: expect.any(Array),
  regularEagerRelations: expect.any(Array),
  reactiveEagerRelations: expect.any(Array),
  reactiveRegularEagerRelations: expect.any(Array),

  dtoReferences: expect.any(Array),
  otherReferences: expect.any(Array),
  otherDtoReferences: expect.any(Array),

  fields: entity.fields.map(expectedField),
  relationships: entity.relationships.map(expectedRelationship),
  primaryKey: expectedPrimaryKey(entity.primaryKey),
  reactiveOtherEntities: expect.any(Set),
  reactiveUniqueEntityTypes: expect.any(Set),
});

describe(`JHipster ${generator} generator`, () => {
  it('generator-list constant matches folder name', async () => {
    await expect((await import('../generator-list.mjs'))[`GENERATOR_${snakeCase(generator).toUpperCase()}`]).toBe(generator);
  });
  it('should support features parameter', () => {
    const instance = new Generator([], { help: true, env: { cwd: 'foo', sharedOptions: { sharedData: {} } } }, { bar: true });
    expect(instance.features.bar).toBe(true);
  });

  describe('with', () => {
    describe('default config', () => {
      let runResult;
      before(async () => {
        runResult = await helpers.run(generatorPath).withOptions({
          defaults: true,
          creationTimestamp: '2000-01-01',
          applicationWithEntities: {
            config: {
              baseName: 'jhipster',
            },
            entities: [
              {
                name: 'EntityA',
                changelogDate: '20220129025419',
                fields: [
                  {
                    fieldName: 'id',
                    fieldType: UUID,
                  },
                ],
              },
            ],
          },
        });
      });

      it('should write files', () => {
        expect(runResult.getSnapshot('**/{.jhipster/**, entities.json}')).toMatchInlineSnapshot(`
Object {
  ".jhipster/EntityA.json": Object {
    "contents": "{
  \\"changelogDate\\": \\"20220129025419\\",
  \\"fields\\": [
    {
      \\"fieldName\\": \\"id\\",
      \\"fieldType\\": \\"UUID\\"
    }
  ],
  \\"name\\": \\"EntityA\\",
  \\"relationships\\": []
}
",
    "stateCleared": "modified",
  },
  ".jhipster/User.json": Object {
    "contents": null,
  },
}
`);
      });
      it('should prepare entities', () => {
        expect(Object.keys(runResult.generator.sharedData.getEntitiesMap())).toMatchInlineSnapshot(`
Array [
  "User",
  "EntityA",
]
`);
      });
      it('should prepare User', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().User;
        expect(entity).toMatchInlineSnapshot(
          expectedEntity(entity),
          `
Object {
  "adminUserDto": "AdminUserDTO",
  "allReferences": Any<Array>,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "blobFields": Any<Array>,
  "builtIn": true,
  "builtInUser": true,
  "clientFramework": "angular",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": Object {},
  "differentTypes": Array [],
  "dto": true,
  "dtoClass": "UserDTO",
  "dtoInstance": "userDTO",
  "dtoMapstruct": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": Array [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.User",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "User",
  "entityAngularNamePlural": "Users",
  "entityApi": "",
  "entityApiUrl": "users",
  "entityClass": "User",
  "entityClassHumanized": "User",
  "entityClassPlural": "Users",
  "entityClassPluralHumanized": "Users",
  "entityContainsCollectionField": false,
  "entityFileName": "user",
  "entityFolderName": "user",
  "entityI18nVariant": "default",
  "entityInstance": "user",
  "entityInstanceDbSafe": "jhiUser",
  "entityInstancePlural": "users",
  "entityJavaPackageFolder": "com/mycompany/myapp/",
  "entityModelFileName": "user",
  "entityNameCapitalized": "User",
  "entityNamePlural": "Users",
  "entityNamePluralizedAndSpinalCased": "users",
  "entityPackage": undefined,
  "entityPage": "user",
  "entityParentPathAddition": "",
  "entityPluralFileName": "usersundefined",
  "entityReactName": "User",
  "entityServiceFileName": "user",
  "entityStateName": "user",
  "entitySuffix": "",
  "entityTableName": "jhi_user",
  "entityTranslationKey": "user",
  "entityTranslationKeyMenu": "user",
  "entityUrl": "user",
  "enums": Array [],
  "existingEnum": false,
  "fakeDataCount": 2,
  "faker": Any<Object>,
  "fieldNameChoices": Array [],
  "fields": Array [
    Object {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "id",
      "columnType": "bigint",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "ID",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "global.field.id",
      "fieldType": "Long",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": false,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": true,
      "fieldTypeNumeric": true,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesMaxlength": undefined,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "Long",
      "jpaGeneratedValue": "sequence",
      "loadColumnType": "numeric",
      "nullable": true,
      "path": Array [
        "id",
      ],
      "propertyName": "id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": Array [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "number",
      "unique": false,
      "uniqueValue": Array [],
    },
    Object {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "login",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Login",
      "fieldIsEnum": false,
      "fieldName": "login",
      "fieldNameAsDatabaseColumn": "login",
      "fieldNameCapitalized": "Login",
      "fieldNameHumanized": "Login",
      "fieldNameUnderscored": "login",
      "fieldTranslationKey": "jhipsterApp.user.login",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "loadColumnType": "string",
      "nullable": true,
      "path": Array [
        "login",
      ],
      "propertyName": "login",
      "reference": Any<Object>,
      "relationshipsPath": Array [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
    Object {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "first_name",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "FirstName",
      "fieldIsEnum": false,
      "fieldName": "firstName",
      "fieldNameAsDatabaseColumn": "first_name",
      "fieldNameCapitalized": "FirstName",
      "fieldNameHumanized": "First Name",
      "fieldNameUnderscored": "first_name",
      "fieldTranslationKey": "jhipsterApp.user.firstName",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "loadColumnType": "string",
      "nullable": true,
      "path": Array [
        "firstName",
      ],
      "propertyName": "firstName",
      "reference": Any<Object>,
      "relationshipsPath": Array [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
    Object {
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "builtIn": true,
      "columnName": "last_name",
      "columnType": "varchar(255)",
      "createRandexp": Any<Function>,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "LastName",
      "fieldIsEnum": false,
      "fieldName": "lastName",
      "fieldNameAsDatabaseColumn": "last_name",
      "fieldNameCapitalized": "LastName",
      "fieldNameHumanized": "Last Name",
      "fieldNameUnderscored": "last_name",
      "fieldTranslationKey": "jhipsterApp.user.lastName",
      "fieldType": "String",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": true,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": false,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "javaFieldType": "String",
      "loadColumnType": "string",
      "nullable": true,
      "path": Array [
        "lastName",
      ],
      "propertyName": "lastName",
      "reference": Any<Object>,
      "relationshipsPath": Array [],
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
  ],
  "fieldsContainBigDecimal": false,
  "fieldsContainBlob": false,
  "fieldsContainBlobOrImage": false,
  "fieldsContainDate": false,
  "fieldsContainDuration": false,
  "fieldsContainEmbedded": false,
  "fieldsContainImageBlob": false,
  "fieldsContainInstant": false,
  "fieldsContainLocalDate": false,
  "fieldsContainManyToOne": false,
  "fieldsContainNoOwnerOneToOne": false,
  "fieldsContainOneToMany": false,
  "fieldsContainOwnerManyToMany": false,
  "fieldsContainOwnerOneToOne": false,
  "fieldsContainTextBlob": false,
  "fieldsContainTimed": false,
  "fieldsContainUUID": false,
  "fieldsContainZonedDateTime": false,
  "fieldsIsReactAvField": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "haveFieldWithJavadoc": false,
  "i18nAlertHeaderPrefix": "jhipsterApp.user",
  "i18nKeyPrefix": "jhipsterApp.user",
  "i18nToLoad": Array [],
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "liquibaseFakeData": Array [
    Object {
      "id": 1,
    },
    Object {
      "id": 2,
    },
  ],
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "User",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": Array [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": Array [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "User",
  "persistInstance": "user",
  "primaryKey": Object {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasLong": true,
    "hasUUID": false,
    "ids": Array [
      Object {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": Array [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": Array [],
    "tsType": "number",
    "type": "Long",
    "typeLong": true,
    "typeNumeric": true,
    "typeString": false,
    "typeUUID": false,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": Array [],
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "UserDTO",
  "restInstance": "userDTO",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "number",
  "uniqueEnums": Object {},
  "updatableEntity": true,
  "useMicroserviceJson": false,
  "validation": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`
        );
      });
      it('should prepare EntityA', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().EntityA;
        expect(entity).toMatchInlineSnapshot(
          expectedEntity(entity),
          `
Object {
  "allReferences": Any<Array>,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "blobFields": Any<Array>,
  "changelogDate": "20220129025419",
  "changelogDateForRecent": 2022-01-29T02:54:19.000Z,
  "clientFramework": "angular",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": Object {},
  "differentTypes": Array [],
  "dto": "no",
  "dtoMapstruct": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": Array [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.EntityA",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "EntityA",
  "entityAngularNamePlural": "EntityAS",
  "entityApi": "",
  "entityApiUrl": "entity-as",
  "entityClass": "EntityA",
  "entityClassHumanized": "Entity A",
  "entityClassPlural": "EntityAS",
  "entityClassPluralHumanized": "Entity AS",
  "entityContainsCollectionField": false,
  "entityFileName": "entity-a",
  "entityFolderName": "entity-a",
  "entityI18nVariant": "default",
  "entityInstance": "entityA",
  "entityInstanceDbSafe": "entityA",
  "entityInstancePlural": "entityAS",
  "entityJavaPackageFolder": "com/mycompany/myapp/",
  "entityModelFileName": "entity-a",
  "entityNameCapitalized": "EntityA",
  "entityNamePlural": "EntityAS",
  "entityNamePluralizedAndSpinalCased": "entity-as",
  "entityPackage": undefined,
  "entityPage": "entity-a",
  "entityParentPathAddition": "",
  "entityPluralFileName": "entity-asundefined",
  "entityReactName": "EntityA",
  "entityServiceFileName": "entity-a",
  "entityStateName": "entity-a",
  "entitySuffix": "",
  "entityTableName": "entitya",
  "entityTranslationKey": "entityA",
  "entityTranslationKeyMenu": "entityA",
  "entityUrl": "entity-a",
  "enums": Array [],
  "existingEnum": false,
  "faker": Any<Object>,
  "fieldNameChoices": Array [],
  "fields": Array [
    Object {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "id",
      "columnType": "\${uuidType}",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "Id",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "jhipsterApp.entityA.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "UUID",
      "jpaGeneratedValue": true,
      "loadColumnType": "\${uuidType}",
      "nullable": true,
      "path": Array [
        "id",
      ],
      "propertyName": "id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": Array [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
  ],
  "fieldsContainBigDecimal": false,
  "fieldsContainBlob": false,
  "fieldsContainBlobOrImage": false,
  "fieldsContainDate": false,
  "fieldsContainDuration": false,
  "fieldsContainEmbedded": false,
  "fieldsContainImageBlob": false,
  "fieldsContainInstant": false,
  "fieldsContainLocalDate": false,
  "fieldsContainManyToOne": false,
  "fieldsContainNoOwnerOneToOne": false,
  "fieldsContainOneToMany": false,
  "fieldsContainOwnerManyToMany": false,
  "fieldsContainOwnerOneToOne": false,
  "fieldsContainTextBlob": false,
  "fieldsContainTimed": false,
  "fieldsContainUUID": true,
  "fieldsContainZonedDateTime": false,
  "fieldsIsReactAvField": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "haveFieldWithJavadoc": false,
  "i18nAlertHeaderPrefix": "jhipsterApp.entityA",
  "i18nKeyPrefix": "jhipsterApp.entityA",
  "i18nToLoad": Array [],
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jhiTablePrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "EntityA",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": Array [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": Array [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "EntityA",
  "persistInstance": "entityA",
  "primaryKey": Object {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasLong": false,
    "hasUUID": true,
    "ids": Array [
      Object {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": Array [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": Array [],
    "tsType": "string",
    "type": "UUID",
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": Array [],
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "EntityA",
  "restInstance": "entityA",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "searchEngineAny": false,
  "searchEngineCouchbase": false,
  "searchEngineElasticsearch": false,
  "searchEngineNo": true,
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "string",
  "uniqueEnums": Object {},
  "updatableEntity": false,
  "useMicroserviceJson": false,
  "validation": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`
        );
      });
    });

    describe('skipUserManagement', () => {
      let runResult;
      before(async () => {
        runResult = await helpers.run(generatorPath).withOptions({
          defaults: true,
          applicationWithEntities: {
            config: {
              baseName: 'jhipster',
              skipUserManagement: true,
            },
            entities: [
              {
                name: 'EntityA',
                changelogDate: '20220129025419',
                fields: [
                  {
                    fieldName: 'id',
                    fieldType: UUID,
                  },
                ],
              },
            ],
          },
        });
      });

      it('should write files', () => {
        expect(runResult.getSnapshot('**/{.jhipster/**, entities.json}')).toMatchInlineSnapshot(`
Object {
  ".jhipster/EntityA.json": Object {
    "contents": "{
  \\"changelogDate\\": \\"20220129025419\\",
  \\"fields\\": [
    {
      \\"fieldName\\": \\"id\\",
      \\"fieldType\\": \\"UUID\\"
    }
  ],
  \\"name\\": \\"EntityA\\",
  \\"relationships\\": []
}
",
    "stateCleared": "modified",
  },
}
`);
      });
      it('should prepare entities', () => {
        expect(Object.keys(runResult.generator.sharedData.getEntitiesMap())).toMatchInlineSnapshot(`
Array [
  "EntityA",
]
`);
      });
      it('should prepare EntityA', () => {
        const entity = runResult.generator.sharedData.getEntitiesMap().EntityA;
        expect(entity).toMatchInlineSnapshot(
          expectedEntity(entity),
          `
Object {
  "allReferences": Any<Array>,
  "applicationType": "monolith",
  "authenticationType": "jwt",
  "baseName": "jhipster",
  "blobFields": Any<Array>,
  "changelogDate": "20220129025419",
  "changelogDateForRecent": 2022-01-29T02:54:19.000Z,
  "clientFramework": "angular",
  "clientRootFolder": "",
  "containsBagRelationships": false,
  "cypressBootstrapEntities": true,
  "databaseType": "sql",
  "differentRelationships": Object {},
  "differentTypes": Array [],
  "dto": "no",
  "dtoMapstruct": false,
  "dtoReferences": Any<Array>,
  "dtoSuffix": "DTO",
  "eagerRelations": Array [],
  "embedded": false,
  "entityAbsoluteClass": "com.mycompany.myapp.domain.EntityA",
  "entityAbsoluteFolder": "com/mycompany/myapp/",
  "entityAbsolutePackage": "com.mycompany.myapp",
  "entityAngularJSSuffix": undefined,
  "entityAngularName": "EntityA",
  "entityAngularNamePlural": "EntityAS",
  "entityApi": "",
  "entityApiUrl": "entity-as",
  "entityClass": "EntityA",
  "entityClassHumanized": "Entity A",
  "entityClassPlural": "EntityAS",
  "entityClassPluralHumanized": "Entity AS",
  "entityContainsCollectionField": false,
  "entityFileName": "entity-a",
  "entityFolderName": "entity-a",
  "entityI18nVariant": "default",
  "entityInstance": "entityA",
  "entityInstanceDbSafe": "entityA",
  "entityInstancePlural": "entityAS",
  "entityJavaPackageFolder": "com/mycompany/myapp/",
  "entityModelFileName": "entity-a",
  "entityNameCapitalized": "EntityA",
  "entityNamePlural": "EntityAS",
  "entityNamePluralizedAndSpinalCased": "entity-as",
  "entityPackage": undefined,
  "entityPage": "entity-a",
  "entityParentPathAddition": "",
  "entityPluralFileName": "entity-asundefined",
  "entityReactName": "EntityA",
  "entityServiceFileName": "entity-a",
  "entityStateName": "entity-a",
  "entitySuffix": "",
  "entityTableName": "entitya",
  "entityTranslationKey": "entityA",
  "entityTranslationKeyMenu": "entityA",
  "entityUrl": "entity-a",
  "enums": Array [],
  "existingEnum": false,
  "faker": Any<Object>,
  "fieldNameChoices": Array [],
  "fields": Array [
    Object {
      "autoGenerate": true,
      "autoGenerateByRepository": true,
      "autoGenerateByService": false,
      "blobContentTypeAny": false,
      "blobContentTypeImage": false,
      "blobContentTypeText": false,
      "columnName": "id",
      "columnType": "\${uuidType}",
      "createRandexp": Any<Function>,
      "dynamic": false,
      "entity": Any<Object>,
      "fieldInJavaBeanMethod": "Id",
      "fieldIsEnum": false,
      "fieldName": "id",
      "fieldNameAsDatabaseColumn": "id",
      "fieldNameCapitalized": "Id",
      "fieldNameHumanized": "Id",
      "fieldNameUnderscored": "id",
      "fieldTranslationKey": "jhipsterApp.entityA.id",
      "fieldType": "UUID",
      "fieldTypeAnyBlob": false,
      "fieldTypeBigDecimal": false,
      "fieldTypeBinary": false,
      "fieldTypeBlob": false,
      "fieldTypeBoolean": false,
      "fieldTypeByteBuffer": false,
      "fieldTypeBytes": false,
      "fieldTypeCharSequence": true,
      "fieldTypeDouble": false,
      "fieldTypeDuration": false,
      "fieldTypeFloat": false,
      "fieldTypeImageBlob": false,
      "fieldTypeInstant": false,
      "fieldTypeInteger": false,
      "fieldTypeLocalDate": false,
      "fieldTypeLong": false,
      "fieldTypeNumeric": false,
      "fieldTypeString": false,
      "fieldTypeTemporal": false,
      "fieldTypeTextBlob": false,
      "fieldTypeTimed": false,
      "fieldTypeUUID": true,
      "fieldTypeZonedDateTime": false,
      "fieldValidate": false,
      "fieldValidateRulesPatternAngular": undefined,
      "fieldValidateRulesPatternJava": undefined,
      "fieldValidateRulesPatternReact": undefined,
      "fieldValidationMax": false,
      "fieldValidationMaxBytes": false,
      "fieldValidationMaxLength": false,
      "fieldValidationMin": false,
      "fieldValidationMinBytes": false,
      "fieldValidationMinLength": false,
      "fieldValidationPattern": false,
      "fieldValidationRequired": false,
      "fieldValidationUnique": false,
      "fieldWithContentType": false,
      "generateFakeData": Any<Function>,
      "id": true,
      "javaFieldType": "UUID",
      "jpaGeneratedValue": true,
      "loadColumnType": "\${uuidType}",
      "nullable": true,
      "path": Array [
        "id",
      ],
      "propertyName": "id",
      "readonly": true,
      "reference": Any<Object>,
      "relationshipsPath": Array [],
      "requiresPersistableImplementation": false,
      "shouldCreateContentType": false,
      "shouldDropDefaultValue": false,
      "tsType": "string",
      "unique": false,
      "uniqueValue": Array [],
    },
  ],
  "fieldsContainBigDecimal": false,
  "fieldsContainBlob": false,
  "fieldsContainBlobOrImage": false,
  "fieldsContainDate": false,
  "fieldsContainDuration": false,
  "fieldsContainEmbedded": false,
  "fieldsContainImageBlob": false,
  "fieldsContainInstant": false,
  "fieldsContainLocalDate": false,
  "fieldsContainManyToOne": false,
  "fieldsContainNoOwnerOneToOne": false,
  "fieldsContainOneToMany": false,
  "fieldsContainOwnerManyToMany": false,
  "fieldsContainOwnerOneToOne": false,
  "fieldsContainTextBlob": false,
  "fieldsContainTimed": false,
  "fieldsContainUUID": true,
  "fieldsContainZonedDateTime": false,
  "fieldsIsReactAvField": false,
  "fluentMethods": true,
  "frontendAppName": "jhipsterApp",
  "generateFakeData": Any<Function>,
  "haveFieldWithJavadoc": false,
  "i18nAlertHeaderPrefix": "jhipsterApp.entityA",
  "i18nKeyPrefix": "jhipsterApp.entityA",
  "i18nToLoad": Array [],
  "implementsEagerLoadApis": false,
  "importApiModelProperty": false,
  "isUsingMapsId": false,
  "jhiPrefix": "jhi",
  "jhiTablePrefix": "jhi",
  "jpaMetamodelFiltering": false,
  "mapsIdAssoc": null,
  "microfrontend": false,
  "microserviceAppName": "",
  "microserviceName": undefined,
  "name": "EntityA",
  "officialDatabaseType": "SQL",
  "otherDtoReferences": Any<Array>,
  "otherEntities": Any<Array>,
  "otherEntityPrimaryKeyTypes": Array [],
  "otherEntityPrimaryKeyTypesIncludesUUID": false,
  "otherReferences": Any<Array>,
  "otherRelationships": Array [],
  "packageFolder": "com/mycompany/myapp/",
  "packageName": "com.mycompany.myapp",
  "pagination": "no",
  "paginationInfiniteScroll": false,
  "paginationNo": true,
  "paginationPagination": false,
  "persistClass": "EntityA",
  "persistInstance": "entityA",
  "primaryKey": Object {
    "autoGenerate": true,
    "composite": false,
    "derived": false,
    "derivedFields": Any<Array>,
    "fields": Any<Array>,
    "hasLong": false,
    "hasUUID": true,
    "ids": Array [
      Object {
        "autoGenerate": true,
        "field": Any<Object>,
        "getter": "getId",
        "name": "id",
        "nameCapitalized": "Id",
        "nameDotted": "id",
        "nameDottedAsserted": "id!",
        "relationshipsPath": Array [],
        "setter": "setId",
      },
    ],
    "name": "id",
    "nameCapitalized": "Id",
    "ownFields": Any<Array>,
    "relationships": Array [],
    "tsType": "string",
    "type": "UUID",
    "typeLong": false,
    "typeNumeric": false,
    "typeString": false,
    "typeUUID": true,
  },
  "prodDatabaseType": "postgresql",
  "reactive": false,
  "reactiveEagerRelations": Any<Array>,
  "reactiveOtherEntities": Any<Set>,
  "reactiveRegularEagerRelations": Any<Array>,
  "reactiveUniqueEntityTypes": Any<Set>,
  "readOnly": false,
  "regularEagerRelations": Any<Array>,
  "relationships": Array [],
  "relationshipsContainEagerLoad": false,
  "relationshipsContainOtherSideIgnore": false,
  "requiresPersistableImplementation": false,
  "resetFakerSeed": Any<Function>,
  "restClass": "EntityA",
  "restInstance": "entityA",
  "saveUserSnapshot": false,
  "searchEngine": "no",
  "searchEngineAny": false,
  "searchEngineCouchbase": false,
  "searchEngineElasticsearch": false,
  "searchEngineNo": true,
  "service": "no",
  "serviceImpl": false,
  "serviceNo": true,
  "skipUiGrouping": false,
  "springDataDescription": "Spring Data JPA",
  "tsKeyType": "string",
  "uniqueEnums": Object {},
  "updatableEntity": false,
  "useMicroserviceJson": false,
  "validation": false,
  "workaroundEntityCannotBeEmpty": false,
  "workaroundInstantReactiveMariaDB": false,
}
`
        );
      });
    });
  });
});
