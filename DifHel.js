class DifHel {
	constructor({pub1, pub2, priv}) {
		this.public1 = pub1;
		this.public2 = pub2;
		this.private = priv;
		this.full = null;
	}

	get state() {
		if (this.public1 && this.public2 && this.private && this.full) return 'Готов!';
		else if (this.public1 && this.public2 && this.private && !this.full) return 'Не введен частичный ключ!';
		else if (!this.public1 || !this.public2 || !this.private) return 'Не введены ключи инициализации!';
		else return 'Не инициализирован!';
	}

	generatePartialKey() {
		return ((BigInt(this.public1) ** BigInt(this.private)) % BigInt(this.public2));
	}

	generateFullKey(part) {
		let full = (BigInt(part)**BigInt(this.private))  % BigInt(this.public2);
		this.full = full;
		return full;
	}

	encryptMessage(msg) {
		let crypt = '';
		let key = Number(this.full);
		for (let c of msg) {
			crypt += String.fromCharCode(c.charCodeAt(0) + key);
		}
		return crypt;
	}

	decryptMessage(crypt) {
		let msg = '';
		let key = Number(this.full);
		for (let c of crypt) {
			msg += String.fromCharCode(c.charCodeAt(0) - key);
		}
		return msg;
	}
}