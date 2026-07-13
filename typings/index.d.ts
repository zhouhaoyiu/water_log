/// <reference types="miniprogram-api-typings" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface MiniEvent<
  Detail = Record<string, unknown>,
  Dataset = Record<string, unknown>,
> {
  detail: Detail;
  target: { dataset: Dataset };
  currentTarget: { dataset: Dataset };
}

interface DeviceInfo {
  deviceId: string;
  deviceName?: string;
  deviceVoltage?: string;
  deviceLocation?: string;
  new?: boolean;
}

interface WaterLogEntry {
  logId?: string;
  new?: boolean;
  [key: string]: unknown;
}

interface DeviceGroup {
  groupId: string;
  groupName: string;
}
