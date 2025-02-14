package ulid

import (
	"testing"
)

func TestMake(t *testing.T) {
	// 複数のULIDを生成して、それぞれがユニークであることを確認
	ids := make(map[string]bool)
	for i := 0; i < 1000; i++ {
		id := Make()
		
		// 長さの検証（ULIDは26文字）
		if len(id) != 26 {
			t.Errorf("ULID length should be 26, got %d", len(id))
		}

		// ユニーク性の検証
		if ids[id] {
			t.Errorf("Duplicate ULID generated: %s", id)
		}
		ids[id] = true

		// 生成されたULIDが有効であることを確認
		if err := Valid(id); err != nil {
			t.Errorf("Generated ULID is invalid: %v", err)
		}
	}
}

func TestValid(t *testing.T) {
	tests := []struct {
		name    string
		ulid    string
		wantErr bool
	}{
		{
			name:    "valid ULID",
			ulid:    Make(),
			wantErr: false,
		},
		{
			name:    "empty string",
			ulid:    "",
			wantErr: true,
		},
		{
			name:    "invalid characters",
			ulid:    "invalid-ulid-string",
			wantErr: true,
		},
		{
			name:    "wrong length",
			ulid:    "123456",
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := Valid(tt.ulid)
			if (err != nil) != tt.wantErr {
				t.Errorf("Valid() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
} 