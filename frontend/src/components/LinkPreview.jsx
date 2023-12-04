import React, { useState, useEffect, forwardRef } from 'react';
import { Tooltip, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Button } from '@chakra-ui/react';

const LinkPreview = forwardRef(({ children, timeDelay = 1 }, ref) => {
  const [showPreview, setShowPreview] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowPreview(false);
    }, timeDelay * 1000);
  };

  const handleOnClick = () => {
    const url = ref.current.href;
    window.open(url, "_blank");
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  if (React.Children.count(children) !== 1) {
    console.error('LinkPreview component expects a single child.');
    return null;
  }

  const anchorTag = React.Children.only(children);

  const ForwardedAnchor = React.forwardRef((props, ref) => (
    <a {...props} ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick}>
      {props.children}
    </a>
  ));

  ForwardedAnchor.displayName = 'ForwardedAnchor';

  return (
    <Tooltip label="Webpage Preview" hasArrow>
      <Popover
        isOpen={showPreview}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <PopoverTrigger>
          <ForwardedAnchor ref={ref}>
            {anchorTag.props.children}
          </ForwardedAnchor>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Webpage Preview</PopoverHeader>
          <PopoverBody>
            <iframe src={anchorTag.props.href} title="Webpage Preview" width="300" height="200" frameBorder="0" className="preview-iframe"></iframe>
            <Button as="a" href={anchorTag.props.href} target="_blank" rel="noopener noreferrer" mt={2} variant="outline" width="100%">
              Open Link
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Tooltip>
  );
});

LinkPreview.displayName = 'LinkPreview';

export default LinkPreview;