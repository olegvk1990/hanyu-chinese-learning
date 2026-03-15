function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

function error(res, message, statusCode = 400, code) {
  const payload = { success: false, error: { message } };
  if (code) payload.error.code = code;
  return res.status(statusCode).json(payload);
}

function paginated(res, data, total, page, limit) {
  const pages = Math.ceil(total / limit) || 1;
  return res.status(200).json({
    success: true,
    data,
    pagination: { total, page, limit, pages }
  });
}

module.exports = {
  success,
  error,
  paginated
};
