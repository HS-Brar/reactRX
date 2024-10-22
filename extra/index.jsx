 // Create a mapping from required paths to sidebar items
  const sidebarMap = sidebar.reduce((acc, item) => {
    acc[item.path] = item;
    return acc;
  }, {});

  // Filter and order sidebar based on the required sequence
  const orderedSidebar = requiredSequence
    .filter(item => sidebarMap[item.path])
    .map(item => sidebarMap[item.path]);