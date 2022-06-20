import api from '@/axios'
import { resolveResponseData } from '@/services/helpers'
import qs from 'qs'

const EVM_TRANSACTIONS_API_BASE_URL = process.env
    .VUE_APP_EVM_TRANSACTIONS_V2_API_BASE_URL as string

export interface IEVMTransactionParams {
    toAddress?: string // address
    fromAddress?: string // address
    address?: string // address (to or from)
    hash?: string // tx hash
    blockStart?: number // Starting block number inclusive
    blockEnd?: number // Ending block number exclusive
}

/**
 * Get a list of EVM transactions (AXChain)
 * @param params api release
 * @link https://docs.axc.network/build/tools/magellan#list-corechain-transactions
 */
export function getEVMTransaction(params?: IEVMTransactionParams) {
    return api
        .get(EVM_TRANSACTIONS_API_BASE_URL, {
            params,
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'repeat' }),
        })
        .then(resolveResponseData)
}
