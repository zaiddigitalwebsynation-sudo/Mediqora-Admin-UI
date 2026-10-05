import ApiClient from "../api/ApiClient";
import Api from "../api/Api";

class ApiService {

  login(data) {
    return ApiClient.post(Api.LOGIN_URL, data);
  }

  getProfile() {
    return ApiClient.get(Api.GET_PROFILE_URL);
  }

  logout() {
    return ApiClient.post(Api.LOGOUT_URL);
  }

  createClinic(data) {
    return ApiClient.post(Api.CREATE_CLINIC_URL, data);
  }

  getClinics(params) {
    return ApiClient.get(Api.GET_CLINICS_URL, { params });
  }

  getClinic(clinicId) {
    return ApiClient.get(Api.GET_CLINIC_URL(clinicId));
  }

  updateClinic(clinicId, data) {
    return ApiClient.put(Api.UPDATE_CLINIC_URL(clinicId), data);
  }

  updateClinicStatus(clinicId, data) {
    return ApiClient.put(Api.UPDATE_CLINIC_STATUS_URL(clinicId), data);
  }

  createSubscription(data) {
    return ApiClient.post(Api.CREATE_SUBSCRIPTION_URL, data);
  }

  getSubscription(subscriptionId) {
    return ApiClient.get(Api.GET_SUBSCRIPTION(subscriptionId));
  }

  getClinicSubscriptionHistory(clinicId) {
    return ApiClient.get(Api.GET_CLINIC_SUBSCRIPTION_HISTORY_URL(clinicId));
  }

  updateSubscription(subscriptionId, data) {
    return ApiClient.put(Api.UPDATE_SUBSCRIPTION_URL(subscriptionId), data);
  }

  createPayment(data) {
    return ApiClient.post(Api.CREATE_PAYMENT_URL, data);
  }

  getPayments(params) {
    return ApiClient.get(Api.GET_PAYMENTS_URL, { params });
  }

  getPayment(paymentId) {
    return ApiClient.get(Api.GET_PAYMENT_URL(paymentId));
  }

  getDashboard() {
    return ApiClient.get(Api.GET_DASHBOARD_URL);
  }

}

export default new ApiService();
  