function PageContent({ children, menu }) {
  return (
    <div className="fullpage">
      <div className="inactiveTop"></div>
      <div className="activeBox">{children}</div>
      {menu}
    </div>
  );
}

export default PageContent;
