#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib'
import 'dotenv/config'
import {HitCounterStack} from "./stack/Lambda/HitCounterStack";

const app = new cdk.App();

new HitCounterStack(app, 'HitCounterStack');

