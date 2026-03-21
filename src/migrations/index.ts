import * as migration_20251216_194325_initial from './20251216_194325_initial';
import * as migration_20260320_113116 from './20260320_113116';

export const migrations = [
  {
    up: migration_20251216_194325_initial.up,
    down: migration_20251216_194325_initial.down,
    name: '20251216_194325_initial',
  },
  {
    up: migration_20260320_113116.up,
    down: migration_20260320_113116.down,
    name: '20260320_113116'
  },
];
