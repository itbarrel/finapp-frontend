export default (permissions, permissionsToChk) => {
  let granted = false;
  let missed = false;
  const entities = Object.keys(permissionsToChk);

  if (Object.keys(permissions).length > 0 && entities.length > 0) {
    entities.forEach((per) => {
      const actionToChk = permissionsToChk[per];

      if (permissions[per] && !missed) {
        const actions = permissions[per];
        if (actions.includes("*")) {
          granted = true;
        } else {
          actionToChk.forEach((action) => {
            // eslint-disable-next-line no-negated-condition
            granted = granted || (!actions.includes(action) ? false : true);
          });
        }
      } else {
        granted = false;
      }

      if (!granted) {
        missed = true;
      }
    });

    return !missed;
  } else {
    return false;
  }
};
