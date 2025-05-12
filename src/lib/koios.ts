import { KoiosProvider } from "@meshsdk/core";

const provider = new KoiosProvider("api");

export type KoiosEpochInfo = {
  epoch_no: number;
  out_sum: string;
  fees: string;
  tx_count: number;
  blk_count: number;
  start_time: number;
  end_time: number;
  first_block_time: number;
  last_block_time: number;
  active_stake: string;
  total_rewards: string | null;
  avg_blk_reward: string;
};

export type KoiosTokenomics = {
  epoch_no: number;
  circulation: string;
  treasury: string;
  reward: string;
  supply: string;
  reserves: string;
  fees: string;
  deposits_stake: string;
  deposits_drep: string;
  deposits_proposal: string;
};

export async function getEpochInfo(
  epoch?: number
): Promise<Array<KoiosEpochInfo>> {
  return await provider
    .get(`/epoch_info?${epoch ? `_epoch_no=${epoch}` : ""}`)
    .catch(() => []);
}

export async function getProtocolParameters(epoch?: number) {
  return await provider.fetchProtocolParameters(epoch).catch(() => null);
}

export async function getTokenomics(
  epoch?: number
): Promise<Array<KoiosTokenomics>> {
  return await provider.get(`/totals?${epoch ? `_epoch_no=${epoch}` : ""}`);
}
