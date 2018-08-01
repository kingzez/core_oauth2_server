/*
 Navicat Premium Data Transfer

 Source Server         : sso
 Source Server Type    : PostgreSQL
 Source Server Version : 100004
 Source Host           : localhost:5432
 Source Catalog        : sso-server
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 100004
 File Encoding         : 65001

 Date: 01/08/2018 15:06:54
*/


-- ----------------------------
-- Table structure for AccessToken
-- ----------------------------
DROP TABLE IF EXISTS "public"."AccessToken";
CREATE TABLE "public"."AccessToken" (
  "id" uuid NOT NULL,
  "token" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "passportId" uuid NOT NULL,
  "clientId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" int8,
  "updatedAt" int8
)
;
ALTER TABLE "public"."AccessToken" OWNER TO "w";

-- ----------------------------
-- Table structure for AuthorizationCode
-- ----------------------------
DROP TABLE IF EXISTS "public"."AuthorizationCode";
CREATE TABLE "public"."AuthorizationCode" (
  "id" uuid NOT NULL,
  "passportId" uuid NOT NULL,
  "clientId" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "redirectUri" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" int8,
  "updatedAt" int8
)
;
ALTER TABLE "public"."AuthorizationCode" OWNER TO "w";

-- ----------------------------
-- Records of AuthorizationCode
-- ----------------------------
BEGIN;
INSERT INTO "public"."AuthorizationCode" VALUES ('6e77ef3d-7c79-4a99-8e5d-eaa42c9cd54b', '6e77ef3d-7c79-4a99-8e5d-eaa42c9cd54b', '6e77ef3d-7c79-4a99-8e5d-eaa42c9cd54b', 'V1t2o2sCZfqiTVdt', 'http://localhost:8998', 1533104997258, 1533104997259);
COMMIT;

-- ----------------------------
-- Table structure for Client
-- ----------------------------
DROP TABLE IF EXISTS "public"."Client";
CREATE TABLE "public"."Client" (
  "id" uuid NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "clientId" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "clientSecret" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "isTrusted" bool,
  "createdAt" int8,
  "updatedAt" int8
)
;
ALTER TABLE "public"."Client" OWNER TO "w";

-- ----------------------------
-- Records of Client
-- ----------------------------
BEGIN;
INSERT INTO "public"."Client" VALUES ('6e77ef3d-7c79-4a99-8e5d-eaa42c9cd54b', 'rmk.com', 'abc123', 'secret', 'f', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for Passport
-- ----------------------------
DROP TABLE IF EXISTS "public"."Passport";
CREATE TABLE "public"."Passport" (
  "id" uuid NOT NULL,
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" int8,
  "updatedAt" int8
)
;
ALTER TABLE "public"."Passport" OWNER TO "w";

-- ----------------------------
-- Records of Passport
-- ----------------------------
BEGIN;
INSERT INTO "public"."Passport" VALUES ('6e77ef3d-7c79-4a99-8e5d-eaa42c9cd54b', 'admin', 'admin', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Primary Key structure for table AccessToken
-- ----------------------------
ALTER TABLE "public"."AccessToken" ADD CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table AuthorizationCode
-- ----------------------------
ALTER TABLE "public"."AuthorizationCode" ADD CONSTRAINT "AuthorizationCode_clientId_key" UNIQUE ("clientId");

-- ----------------------------
-- Primary Key structure for table AuthorizationCode
-- ----------------------------
ALTER TABLE "public"."AuthorizationCode" ADD CONSTRAINT "AuthorizationCode_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Client
-- ----------------------------
ALTER TABLE "public"."Client" ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Passport
-- ----------------------------
ALTER TABLE "public"."Passport" ADD CONSTRAINT "Passports_pkey" PRIMARY KEY ("id");
