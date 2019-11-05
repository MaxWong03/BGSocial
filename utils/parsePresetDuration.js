const parsePresetDuration = (presetUnit) => {

  if (presetUnit === '00') return '';

  if (presetUnit[0] === '0') return presetUnit[1];

  return presetUnit;
}

export { parsePresetDuration };