The error you're seeing occurs because Node.js, by default, does not support ES module syntax (import/export) unless the project is configured to use ES modules.

To resolve this, you have two options:

Option 1: Use CommonJS Syntax (Recommended for simplicity)
You can switch to CommonJS syntax, which is supported by default in Node.js. Here's how to modify the code:

Change import statements to require:
-> Replace import express from 'express'; with const express = require('express');
-> Replace import https from 'https'; with const https = require('https');
-> Replace import { URL } from 'url'; with const { URL } = require('url');


