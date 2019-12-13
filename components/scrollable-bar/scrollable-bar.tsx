import React, {
  FC,
  CSSProperties,
  Children,
  ReactNode,
  cloneElement,
  useRef,
  useState,
  useEffect,
  useCallback
} from 'react';
import { Icon } from 'antd';
import classNames from '@pansy/classnames';
import ResizeObserver from 'resize-observer-polyfill';
import Item, { ItemProps, KeyType } from './item';
import { setTransform, isTransform3dSupported } from './utils';

/**
 * 展示模式
 * vertical:垂直; horizontal:水平;
 * */
export type Mode = 'vertical' | 'horizontal';
interface ScrollableBarFC<P> extends FC<P> {
  Item?: typeof Item;
}

interface ScrollableBarProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  // 当前活动的Key
  activeKey?: string;
  // 展示模式 - (垂直/水平)
  mode?: Mode;
  // 是否开启滚动动画
  scrollAnimated?: boolean;
  // 上一个点击回调
  onPrevClick?: (e) => void;
  // 下一个点击回调
  onNextClick?: (e) => void;
  // 子项点击回调
  onItemClick?: (key) => void;
  // 上一个Icon图标
  prevIcon?: ReactNode;
  // 下一个Icon图标
  nextIcon?: ReactNode;
  // 方向设置(右向左/左向右)
  direction?: 'rtl' | 'ltr'
}

let offset: number = 0;
let resizeObserver;

const defaultPrefixCls: string = 'ant-plus-scrollable-bar';

const ScrollableBar: ScrollableBarFC<ScrollableBarProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    mode,
    activeKey,
    children,
    prevIcon,
    nextIcon,
    onNextClick,
    onPrevClick,
    onItemClick,
    direction,
    scrollAnimated
  } = props;

  const navRef = useRef(null);
  const navWrapRef = useRef(null);
  const containerRef = useRef(null);
  const activeItemRef = useRef(null);
  const navContainerRef = useRef(null);
  const [next, setNext] = useState<boolean>(false);
  const [prev, setPrev] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<KeyType>('');

  useEffect(() => {
    setCurrentKey(activeKey)
    const debouncedResize = () => {
      setNextPrev();
      scrollToActiveNode();
    };
    const containerNode = containerRef.current;
    resizeObserver = new ResizeObserver(debouncedResize);
    resizeObserver.observe(containerNode);

    () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    }
  }, [props.activeKey])

  const debouncedResize = useCallback(() => {

  }, [props.children])

  const handlePrevClick = (e) => {
    if (!prev) return;
    onPrevClick && onPrevClick(e);

    const navWrapNode = navWrapRef.current;
    const navWrapNodeWH = getOffsetWH(navWrapNode);

    setOffset(offset + navWrapNodeWH);
  }

  const handleNextClick = (e) => {
    if (!next) return;
    onNextClick && onNextClick(e);

    const navWrapNode = navWrapRef.current;
    const navWrapNodeWH = getOffsetWH(navWrapNode);

    setOffset((offset - navWrapNodeWH));
  }

  const getOffsetWH = (node) => {
    let prop = 'offsetWidth';
    if (mode === 'vertical') {
      prop = 'offsetHeight';
    }
    return node && node[prop];
  }

  const getOffsetLT = (node) => {
    let prop = 'left';
    if (mode === 'vertical') {
      prop = 'top';
    }
    return node.getBoundingClientRect()[prop];
  }

  const getScrollWH = (node) => {
    let prop = 'scrollWidth';
    if (mode === 'vertical') {
      prop = 'scrollHeight';
    }
    return node && node[prop];
  }

  const setNextPrev = () => {
    const navNode = navRef.current;
    const navWrapNode = navWrapRef.current;
    const containerNode = containerRef.current;
    const navContainerNode = navContainerRef.current;

    const navNodeWH = getScrollWH(navContainerNode || navNode);
    const containerNodeWH = getOffsetWH(containerNode) + 1;
    const navWrapNodeWH = getOffsetWH(navWrapNode);

    const minOffset = containerNodeWH - navNodeWH;

    let [prevCopy, nextCopy] = [prev, next];

    if (minOffset >= 0) {
      nextCopy = false;
      setOffset(0, false);
      offset = 0;
    } else if (minOffset < offset) {
      nextCopy = true;
    } else {
      nextCopy = false;
      const realOffset = navWrapNodeWH - navNodeWH;
      setOffset(realOffset, false);
      offset = realOffset;
    }

    if (offset < 0) {
      prevCopy = true;
    } else {
      prevCopy = false;
    }

    setNext(nextCopy);
    setPrev(prevCopy);

    return {
      next: nextCopy,
      prev: prevCopy
    };
  }

  /**
   *
   * @param offset
   * @param checkNextPrev
   */
  const setOffset = (value: number, checkNextPrev = true) => {
    let target = Math.min(0, value);

    if (offset !== target) {
      offset = target;
      let navOffset: {
        name?: string,
        value?: string
      } = {};

      const navNode = navRef.current;
      const navStyle = navNode.style;

      const transformSupported = isTransform3dSupported(navStyle);

      if (mode === 'vertical') {
        if (transformSupported) {
          navOffset = {
            value: `translate3d(0,${target}px,0)`,
          };
        } else {
          navOffset = {
            name: 'top',
            value: `${target}px`,
          };
        }
      } else if (transformSupported) {
        if (direction === 'rtl') {
          target = -target;
        }
        navOffset = {
          value: `translate3d(${target}px,0,0)`,
        };
      } else {
        navOffset = {
          name: 'left',
          value: `${target}px`,
        };
      }

      if (transformSupported) {
        setTransform(navStyle, navOffset.value);
      } else {
        navStyle[navOffset.name] = navOffset.value;
      }
      if (checkNextPrev) {
        setNextPrev();
      }
    }
  }

  /**
   * 滚动到活动的节点
   * @param e
   */
  const scrollToActiveNode = (e?) => {
    const navWrapNode = navWrapRef.current;
    const activeItemNode = activeItemRef.current;

    if (e && e.target !== e.currentTarget || !activeItemNode) return;

    // 当不可滚动或首次进入可滚动状态时，请勿发出滚动
    if (next || prev) return;

    const activeTabWH = getScrollWH(activeItemNode);
    const navWrapNodeWH = getOffsetWH(navWrapNode);

    const wrapOffset = getOffsetLT(navWrapNode);
    const activeTabOffset = getOffsetLT(activeItemNode);

    let offsetCopy = offset;

    if (wrapOffset > activeTabOffset) {
      offsetCopy += (wrapOffset - activeTabOffset);
      setOffset(offsetCopy);
    } else if ((wrapOffset + navWrapNodeWH) < (activeTabOffset + activeTabWH)) {
      offsetCopy -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH);
      setOffset(offsetCopy);
    }
  }

  const prevTransitionEnd = (e) => {
    if (e.propertyName !== 'opacity') return;
    const containerNode = containerRef.current;
    scrollToActiveNode({
      target: containerNode,
      currentTarget: containerNode,
    });
  }

  const showNextPrev = prev || next;

  const prevButton = (
    <span
      unselectable="on"
      onClick={handlePrevClick}
      className={classNames({
        [`${prefixCls}-prev`]: 1,
        [`${prefixCls}-btn-disabled`]: !prev,
        [`${prefixCls}-arrow-show`]: showNextPrev,
      })}
      onTransitionEnd={prevTransitionEnd}
    >
      {prevIcon || (
        <span className={`${prefixCls}-prev-icon`} >
          <Icon type="left" />
        </span>
      )}
    </span>
  );

  const nextButton = (
    <span
      onClick={handleNextClick}
      unselectable="on"
      className={classNames({
        [`${prefixCls}-next`]: 1,
        [`${prefixCls}-btn-disabled`]: !next,
        [`${prefixCls}-arrow-show`]: showNextPrev,
      })}
    >
      {nextIcon || (
        <span className={`${prefixCls}-next-icon`}>
          <Icon type="right" />
        </span>
      )}
    </span>
  );

  const handleItemClick = (key) => {
    key && setCurrentKey(key);
    onItemClick && onItemClick(key);
  }

  const childNodes = [];
  Children.forEach(children, (child: React.ReactElement<ItemProps>) => {
    if (!child) return;
    const key = child.key;
    const className = child['className'];

    const ref = {
      ref: null
    };
    if (currentKey === key) {
      ref.ref = activeItemRef;
    }

    const node = cloneElement(child as any, {
      prefixCls: `${prefixCls}-item`,
      className: classNames(className, {
        [`${prefixCls}-item-active`]: currentKey === key
      }),
      onClick: () => {
        handleItemClick(key)
      },
      ...ref
    })

    childNodes.push(node);
  })

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}-scrolling`]: showNextPrev
      })}
      style={style}
      ref={containerRef}
    >
      {prevButton}
      {nextButton}
      <div
        className={`${prefixCls}-nav-wrap`}
        ref={navWrapRef}
      >
        <div className={`${prefixCls}-nav-scroll`}>
          <div
            className={classNames(`${prefixCls}-nav`, {
              [`${prefixCls}-nav-animated`]: scrollAnimated
            })}
            ref={navRef}
          >
            <div ref={navContainerRef}>
              {childNodes}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ScrollableBar.defaultProps = {
  prefixCls: defaultPrefixCls,
  mode: 'horizontal',
  scrollAnimated: true,
  onItemClick: (key) => { }
}

export default ScrollableBar;
