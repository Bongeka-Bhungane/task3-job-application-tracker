import React from 'react'
import Text from './Text'
import Search from "./Search";

export default function Header() {
  return (
    <div className="header">
      <Text variant="h2" className="logo">
        Links Vault
      </Text>
      <div>
        < Search />
      </div>
    </div>
  );
}
