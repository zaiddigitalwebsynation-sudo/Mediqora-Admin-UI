const BASE_URL = import.meta.env.VITE_SERVER_URL;

const API = {
  LOGIN_URL: `${BASE_URL}/admin/login`,
  GET_PROFILE_URL: `${BASE_URL}/admin/profile`,
  LOGOUT_URL: `${BASE_URL}/admin/logout`,

  CREATE_CLINIC_URL: `${BASE_URL}/clinic/create`,
  GET_CLINICS_URL: `${BASE_URL}/clinic/`,
  GET_CLINIC_URL: (clinicId) => `${BASE_URL}/clinic/${clinicId}`,
  UPDATE_CLINIC_URL: (clinicId) => `${BASE_URL}/clinic/update/${clinicId}`,
  UPDATE_CLINIC_STATUS_URL: (clinicId) => `${BASE_URL}/clinic/updateStatus/${clinicId}`,

  CREATE_SUBSCRIPTION_URL: `${BASE_URL}/subscription/create`,
  GET_SUBSCRIPTION: (subscriptionId) => `${BASE_URL}/subscription/${subscriptionId}`,
  GET_CLINIC_SUBSCRIPTION_HISTORY_URL: (clinicId) => `${BASE_URL}/subscription/clinic/${clinicId}/history`,
  UPDATE_SUBSCRIPTION_URL: (subscriptionId) => `${BASE_URL}/subscription/update/${subscriptionId}`,

  CREATE_PAYMENT_URL: `${BASE_URL}/payment/create`,
  GET_PAYMENTS_URL: `${BASE_URL}/payment/`,
  GET_PAYMENT_URL: (paymentId) => `${BASE_URL}/payment/${paymentId}`,

  GET_DASHBOARD_URL: `${BASE_URL}/analytics/dashboard`,


};

export default API;
