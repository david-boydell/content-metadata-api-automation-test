export default {
  worldParameters: {
    baseUrl: process.env.BASE_URL || 'https://testapi.io',
    responseUpperLimit: 2000,
  },
  tags: '@run',
  format: ['html:cucumber-report.html'],
}
