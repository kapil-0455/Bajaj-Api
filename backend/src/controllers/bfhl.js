const { buildHierarchiesAndSummary } = require('../services/hierarchyService');
require('dotenv').config();

const USER_ID = process.env.USER_ID || 'johndoe_17091999';
const EMAIL_ID = process.env.EMAIL_ID || 'john.doe@college.edu';
const COLLEGE_ROLL_NUMBER = process.env.COLLEGE_ROLL_NUMBER || '21CS1001';

function processGraphRequest(req, res, next) {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid request format. 'data' must be an array."
      });
    }

    const result = buildHierarchiesAndSummary(data);

    return res.status(200).json({
      user_id: USER_ID,
      email_id: EMAIL_ID,
      college_roll_number: COLLEGE_ROLL_NUMBER,
      ...result
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { processGraphRequest };
