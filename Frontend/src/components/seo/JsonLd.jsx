function JsonLd({ data }) {
  if (!data) {
    return null;
  }

  // Each JSON-LD block must be its own <script> tag for maximum parser
  // compatibility (Google accepts arrays, but many validators do not).
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

export default JsonLd;
