  colors={({ id }) => {
        switch (id) {
          case "WIP":
            return "#1f77b4"; // custom color for WIP
          case "Pending":
            return "#ff7f0e"; // custom color for Pending
          case "BOM":
            return "#2ca02c"; // custom color for BOM
          case "Closed":
            return "#d62728"; // custom color for Closed
          default:
            return "#000000"; // fallback color
        }
      }}