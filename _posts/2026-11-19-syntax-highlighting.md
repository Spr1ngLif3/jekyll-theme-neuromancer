---
title: syntax highlighting
description: Code blocks in a few languages, with language labels and copy buttons.
tags: [reference, code]
---

Fenced code blocks are highlighted by Rouge. Hover a block to reveal the
copy button.

```python
import socket

def scan(host: str, ports: range) -> list[int]:
    """Return the open TCP ports on host."""
    found = []
    for port in ports:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(0.3)
            if s.connect_ex((host, port)) == 0:
                found.append(port)
    return found

print(scan("127.0.0.1", range(20, 1025)))
```

```c
#include <stdio.h>

int main(void) {
    const char *msg = "wake up, neo";
    for (int i = 0; msg[i] != '\0'; i++)
        putchar(msg[i] ^ 0x20);
    return 0;
}
```

```rust
fn xor(data: &[u8], key: u8) -> Vec<u8> {
    data.iter().map(|b| b ^ key).collect()
}
```

```console
$ ssh case@chiba.city -p 2222
Welcome to the sprawl.
case@chiba:~$ uptime
 23:59:01 up 1337 days,  load average: 0.42, 0.13, 0.07
```

```diff
- ICE: enabled
+ ICE: bypassed
```

With line numbers:

{% highlight javascript linenos %}
const decks = ["ono-sendai", "hosaka"];
decks.forEach((deck) => console.log(`jacking into ${deck}`));
{% endhighlight %}
