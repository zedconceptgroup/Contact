import { Router } from 'express';
import { InMemoryPropertyRepository } from '../repositories/InMemoryPropertyRepository';
import { baseRates, dashboardMetrics, defaultFees, defaultTaxes, paymentSchedule, propertyBundles, securityDeposit } from '../data/sampleData';

const router = Router();
const propertyRepository = new InMemoryPropertyRepository();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

router.get('/dashboard', (_req, res) => {
  res.json(dashboardMetrics);
});

router.get('/properties', (_req, res) => {
  const bundles = propertyRepository.list();
  res.json(
    bundles.map(({ property, instructions, rates }) => ({
      ...property,
      instructions,
      rates
    }))
  );
});

router.get('/properties/:id', (req, res) => {
  const bundle = propertyRepository.findById(req.params.id);
  if (!bundle) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(bundle);
});

router.get('/fees', (_req, res) => res.json(defaultFees));
router.get('/taxes', (_req, res) => res.json(defaultTaxes));
router.get('/security', (_req, res) => res.json(securityDeposit));
router.get('/payment-schedule', (_req, res) => res.json(paymentSchedule));
router.get('/rates', (_req, res) => res.json(baseRates));

router.get('/rooms', (_req, res) => {
  const rooms = propertyBundles.map((bundle) => ({
    propertyId: bundle.property.id,
    rooms: bundle.rooms ?? []
  }));
  res.json(rooms);
});

export default router;
