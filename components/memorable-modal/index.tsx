import * as React from 'react';
import { Checkbox, Modal } from 'antd';
import { ModalFuncProps } from 'antd/es/modal';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ArgsType } from '../utils/types';

export type TimeUnit = 'day' | 'hour' | 'minute' | 'second';
export type MemorableModalFuncType = 'confirm' | 'error' | 'info' | 'success' | 'warn';
export interface MemorableModalProps<P = any> extends ModalFuncProps {
  /**
   * @en
   * Checked by default.
   * Works with `optional === undefined`.
   *
   * @zh
   * 默认选中不再提示，
   * `enable === undefined` 时生效。
   *
   * @default
   * true
   */
  defaultChecked?: boolean;
  /**
   * @en
   * Force enable / disable.
   *
   * @zh
   * 强制启用或关闭计时。
   *
   * @default
   * undefined
   */
  enable?: boolean;
  /**
   * @en
   * No more prompts within the specified time and go directly to `onOK()`.
   * The actual duration is related to `timeUnit`.
   *
   * @zh
   * 指定时间内不再提示，并直接进入 `onOk()` 回调。
   * 具体时间长度与 `timeUnit` 有关。
   *
   * @default
   * 1
   */
  expiresIn?: number;
  /**
   * @en
   * Used to persist timing information in storage.
   *
   * @zh
   * 用于记录计时信息。
   */
  id: string;
  /**
   * @en
   * Callback after confirmation. If it returns a promise,
   * there will show the loading state and will close modal after `resolve()`.
   * During the timing period, this callback will be called directly without confirmation.
   *
   * @zh
   * 用户确认后的回调函数。如果返回结果为一个promise，将会显示加载态，
   * 并在 `resolve()` 之后关闭 Modal。在计时期间内会直接进入回调，不会显示 Modal 。
   *
   * @default
   * () => {}
   */
  onOk?: (
    ...args: ArgsType<Exclude<ModalFuncProps['onOk'], undefined>> | [null]
  ) => void | PromiseLike<void>;
  /**
   * @en
   * Unit of `expiresIn`.
   *
   * @zh
   * `expiresIn` 的时间单位。
   *
   * @example
   * oneOf('day', 'hour', 'minute', 'second')
   *
   * @default
   * 'minute'
   */
  timeUnit?: TimeUnit;
  /**
   * @en
   * Prompt text. Set to `null` to hide.
   *
   * @zh
   * 提示文字。设置为 `null` 将不会显示。
   *
   * @default
   * `No more reminders within ${expiresIn} ${timeUnit}${expiresIn === 1 ? '' : 's'}`
   */
  formatText?: ((expiresIn: number, timeUnit: TimeUnit) => React.ReactNode) | null;
}
export type MemorableModalFunc = (
  props: MemorableModalProps,
) => {
  destroy?: () => void;
  update?: (newConfig: ModalFuncProps) => void;
};

interface MemorableModalComponent {
  confirm: MemorableModalFunc;
  error: MemorableModalFunc;
  info: MemorableModalFunc;
  locale: (e: number, u: TimeUnit) => React.ReactNode;
  warn: MemorableModalFunc;
  setLocale: (formatText: (expiresIn: number, timeUnit: TimeUnit) => React.ReactNode) => void;
  setStorage: (storage: Storage) => void;
  success: MemorableModalFunc;
  storage: Storage;
}

const noop = () => {};
const checked: { [key: string]: boolean } = {};
const onChangeCheckbox = ({ target }: CheckboxChangeEvent) =>
  target.value && (checked[target.value] = target.checked);
const tranformTime = (pre: number, unit: TimeUnit): number => {
  switch (unit) {
    case 'second':
      return pre * 1000;
    case 'minute':
      return pre * 60 * 1000;
    case 'hour':
      return pre * 60 * 60 * 1000;
    case 'day':
      return pre * 24 * 60 * 60 * 1000;
    default:
      return pre;
  }
};

const Memorable = (
  {
    content,
    defaultChecked = true,
    enable,
    expiresIn = 1,
    id,
    onOk = noop,
    timeUnit = 'minute',
    formatText = MemorableModal.locale,
    ...modalProps
  }: MemorableModalProps,
  type: MemorableModalFuncType,
) => {
  const now = Date.now();
  const formattedId = `MemorableModal-${type}-${id}`;
  const prevExpiryTime = MemorableModal.storage.getItem(formattedId);
  if (prevExpiryTime && now.toString() < prevExpiryTime) {
    onOk!(null);
    return {};
  }

  if (!(formattedId in checked)) {
    /**
     * - `defaultChecked`: set by developer
     * - `prevExpiryTime`: restore the last selected record
     */
    checked[formattedId] = defaultChecked || !!prevExpiryTime;
  }

  if (formatText !== null) {
    content = (
      <React.Fragment key="memorable-modal-content-with-prompt">
        {content}
        <div key="memorable-modal-prompt-block">
          <Checkbox
            defaultChecked={checked[formattedId]}
            key="memorable-modal-prompt"
            onChange={onChangeCheckbox}
            value={formattedId}
          >
            {formatText(expiresIn, timeUnit)}
          </Checkbox>
        </div>
      </React.Fragment>
    );
  }

  return Modal[type]({
    ...modalProps,
    content,
    onOk: (...args: any[]) => {
      if ((checked[formattedId] && enable !== false) || enable === true) {
        const nextExpiryTime = expiresIn
          ? (now + tranformTime(expiresIn, timeUnit)).toString()
          : '9';
        MemorableModal.storage.setItem(formattedId, nextExpiryTime);
      } else if (prevExpiryTime) {
        MemorableModal.storage.removeItem(formattedId);
      }
      return onOk!(...args);
    },
  });
};

const MemorableModal: MemorableModalComponent = {
  confirm: props => Memorable(props, 'confirm'),
  error: props => Memorable(props, 'error'),
  info: props => Memorable(props, 'info'),
  locale: (e: number, u: TimeUnit): React.ReactNode =>
    `No more reminders within ${e} ${u}${e === 1 ? '' : 's'}`,
  warn: props => Memorable(props, 'warn'),
  setLocale: formatText => (MemorableModal.locale = formatText),
  setStorage: newStorage => (MemorableModal.storage = newStorage),
  success: props => Memorable(props, 'success'),
  storage: sessionStorage,
};

export default MemorableModal;
