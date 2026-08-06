import { MockAiAdapter } from './mock-ai.adapter';

describe('MockAiAdapter', () => {
  it('separa evidencia declarada, recuperada y propone hipótesis', async () => {
    const adapter = new MockAiAdapter();
    const res = await adapter.analyze({
      vehicle: { vin: 'ABC', make: 'Marca', model: 'Modelo', year: 2020 },
      symptoms: ['Humo blanco'],
      dtcs: ['P0300'],
      measurements: [],
    });

    expect(res.evidences.length).toBe(2);
    expect(res.hypotheses.length).toBeGreaterThan(0);
    expect(res.missingInformation.length).toBe(0);
  });
});
