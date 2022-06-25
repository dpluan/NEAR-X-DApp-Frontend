export default {
    "contract": {
        name: "Counter",
        attributes: [
            {
                    "name": "value",
                    "type": "u8"
            },
            {
                    "name": "new_value",
                    "type": "u8"
            },
            {
                    "name": "accounts",
                    "type": "LookupMap<AccountId, VersionedAccount>"
            }
        ]
    },
    entities:  [
        {
            "type": "storage",
            "name": "OldCounter",
            "attributes": [
                {
                    "name": "value",
                    "type": "u8"
                },
                {
                    "name": "new_value",
                    "type": "u8"
                }
            ]
        },
         {
            "type": "storage",
            "name": "AccountV1",
            "attributes": [
                {
                    "name": "vote",
                    "type": "u8"
                },
                {
                    "name": "balance",
                    "type": "u8"
                },
                {
                    "name": "bio",
                    "type": "String"
                }
            ]
        },
         {
            "type": "enum",
            "name": "VersionedAccount",
            "attributes": [
                {
                    "name": "V1",
                    "type": "AccountV1"
                },
                {
                    "name": "V2",
                    "type": "AccountV2"
                },
                {
                    "name": "Current",
                    "type": "Account"
                }
            ]
        }
    ],
    functions: [
        "init",
        "get_num"
    ],
    impl_entities: [
        "impl_from_for_account",
        "impl_from_for_version_account"
    ]
}