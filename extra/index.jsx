function usePreventBackNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Push the initial state
    window.history.pushState(null, document.title, window.location.pathname);

    const handlePopState = (event) => {
      console.log("Back button clicked, preventing navigation");
      // Push the current state again to keep the user on the current page
      window.history.pushState(null, document.title, window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
}
