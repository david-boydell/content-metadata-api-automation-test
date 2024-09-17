export default {
  worldParameters: {
    baseUrl: process.env.BASE_URL || 'https://testapi.io',
    responseUpperLimit: 1000,
  },
  tags: '@run',
  format: ['html:cucumber-report.html'],
}
